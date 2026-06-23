const pool = require("../config/db");

exports.createLead = async (req, res) => {
  if (
    req.user.role !== "Manager" &&
    req.user.role !== "Admin"
  ) {
    return res.status(403).json({
      message: "Access Denied"
    });
  }

  try {

    const {
      name,
      email,
      phone,
      source,
      status,
      notes
    } = req.body;

    const agentQuery = `
      SELECT users.id
      FROM users
      LEFT JOIN leads
      ON users.id = leads.assigned_to
      WHERE users.role = 'Agent'
      GROUP BY users.id
      ORDER BY COUNT(leads.id) ASC
      LIMIT 1
    `;

    const agentResult = await pool.query(agentQuery);

    let assignedAgent = null;

    if (agentResult.rows.length > 0) {
      assignedAgent = agentResult.rows[0].id;
    }

    const insertQuery = `
      INSERT INTO leads
      (
        name,
        email,
        phone,
        source,
        status,
        notes,
        assigned_to
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `;

    const values = [
      name,
      email,
      phone,
      source,
      status,
      notes,
      assignedAgent
    ];

    const result = await pool.query(
      insertQuery,
      values
    );

    const leadId = result.rows[0].id;

    await pool.query(
      `
      INSERT INTO activity_logs
      (lead_id, action)
      VALUES($1,$2)
      `,
      [leadId, "Lead Created"]
    );

    res.status(201).json({
      message: "Lead created",
      lead: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Lead creation failed"
    });

  }

};
exports.getLeads = async (req, res) => {

  try {

    const search = req.query.search || "";
    const status = req.query.status || "";
    const source = req.query.source || "";
    const sort = req.query.sort || "DESC";

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const query = `
      SELECT *
      FROM leads
      WHERE
      name ILIKE $1
      AND status ILIKE $2
      AND source ILIKE $3
      ORDER BY created_at ${sort}
      LIMIT $4
      OFFSET $5
    `;

    const values = [
      `%${search}%`,
      `%${status}%`,
      `%${source}%`,
      limit,
      offset
    ];

    const result = await pool.query(query, values);

    res.status(200).json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to fetch leads"
    });

  }


};
exports.getLeadById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM leads WHERE id = $1",
      [id]
    );

    res.status(200).json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to fetch lead"
    });

  }

};

exports.updateLead = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      email,
      phone,
      source,
      status,
      notes
    } = req.body;

    const query = `
      UPDATE leads
      SET
        name = $1,
        email = $2,
        phone = $3,
        source = $4,
        status = $5,
        notes = $6
      WHERE id = $7
      RETURNING *
    `;

    const values = [
      name,
      email,
      phone,
      source,
      status,
      notes,
      id
    ];

    const result = await pool.query(
      query,
      values
    );

    await pool.query(
      `
  INSERT INTO activity_logs
  (lead_id, action)
  VALUES($1,$2)
  `,
      [id, "Lead Updated"]
    );

    res.status(200).json({
      message: "Lead updated",
      lead: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to update lead"
    });

  }

};

exports.deleteLead = async (req, res) => {
  if (req.user.role !== "Admin") {

    return res.status(403).json({
      message: "Only Admin can delete leads"
    });

  }

  try {

    const { id } = req.params;

    await pool.query(
      `
  INSERT INTO activity_logs
  (lead_id, action)
  VALUES($1,$2)
  `,
      [id, "Lead Deleted"]
    );

    await pool.query(
      "DELETE FROM leads WHERE id = $1",
      [id]
    );

    res.status(200).json({
      message: "Lead deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: "Failed to delete lead"
    });

  }

};
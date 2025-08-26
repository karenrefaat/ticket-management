import React, { useState, useEffect } from "react";
import "../css/dashboard.css"; 
import MenuBar from "./menu";
import { useForm } from "react-hook-form";
import IssueProgressBar from "./issueprogressbar"; 
export default function Dashboard() {
  const role = localStorage.getItem("role"); 
 
  const [issues, setIssues] = useState([
    { id: 1, customer: "John Doe", priority: "High", status: "pending" },
    { id: 2, customer: "Sara Ali", priority: "Low", status: "solved" },
    { id: 3, customer: "Mike Lee", priority: "Medium", status: "pending" },
    { id: 4, customer: "Lara Smith", priority: "High", status: "not_reached" },
  ]);

  useEffect(() => {
    if (role === "admin") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      setIssues((prev) =>
        [...prev].sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        )
      );
    }
  }, [role]);

  const handleCheckbox = (id) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status: issue.status === "solved" ? "pending" : "solved",
            }
          : issue
      )
    );
  };

  const solved = issues.filter((i) => i.status === "solved").length;
  const pending = issues.filter((i) => i.status === "pending").length;
  const notReached = issues.filter((i) => i.status === "not_reached").length;
  const total = issues.length;
  const successRate = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

  
  const [tickets, setTickets] = useState([
    { id: 1, customer: "Karen Refaat", issue: "Login Issue", priority: "High", status: "pending" },
    { id: 2, customer: "Karen Refaat", issue: "Payment Error", priority: "Medium", status: "done" },
    { id: 3, customer: "Karen Refaat", issue: "Account Locked", priority: "Low", status: "pending" },
    { id: 4, customer: "Karen Refaat", issue: "Feature Request", priority: "Medium", status: "done" },
  ]);
  const [newTicketId, setNewTicketId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newTicket = {
      id: tickets.length + 1,
      customer: data.customer,
      issue: data.issue,
      priority: data.priority,
      status: "opened",
    };
    setTickets([...tickets, newTicket]);
    setNewTicketId(newTicket.id);
    reset({
      priority: "Select priority",
      customer: "",
      issue: "",
    });
  };

  useEffect(() => {
    if (newTicketId) {
      const timer = setTimeout(() => setNewTicketId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [newTicketId]);

  return (
    <div className="dashboard-container">
      <MenuBar />
      <div className="main-content">
        {role === "admin" ? (
          <>
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <div className="data-table">
              <h2>My Assigned Issues</h2>
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Solved?</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td>{issue.customer}</td>
                      <td>{issue.priority}</td>
                      <td>{issue.status}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={issue.status === "solved"}
                          onChange={() => handleCheckbox(issue.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="data-table">
              <h2>My Performance</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Total Issues</td>
                    <td>{total}</td>
                  </tr>
                  <tr>
                    <td>Solved</td>
                    <td>{solved}</td>
                  </tr>
                  <tr>
                    <td>Pending</td>
                    <td>{pending}</td>
                  </tr>
                  <tr>
                    <td>Not Reached</td>
                    <td>{notReached}</td>
                  </tr>
                  <tr>
                    <td>Success Rate</td>
                    <td>{successRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="progress-section">
              {tickets.map((ticket) => (
                <IssueProgressBar key={ticket.id} issue={ticket.issue} status={ticket.status} />
              ))}
            </div>
            <h1 className="dashboard-title">Customer Service</h1>
            <div className="ticket-form">
              <h2>Submit New Ticket</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="customer">Customer Name</label>
                  <input
                    id="customer"
                    {...register("customer", { required: "Customer name is required" })}
                    placeholder="Enter customer name"
                  />
                  {errors.customer && <span className="error">{errors.customer.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="issue">Issue Description</label>
                  <textarea
                    id="issue"
                    {...register("issue", { required: "Issue description is required" })}
                    placeholder="Describe the issue"
                  />
                  {errors.issue && <span className="error">{errors.issue.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select id="priority" defaultValue="" {...register("priority", { required: "Priority is required" })}>
                    <option value="" disabled hidden>Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && <span className="error">{errors.priority.message}</span>}
                </div>
                <button type="submit">Submit Ticket</button>
              </form>
            </div>
            <div className="data-table">
              <h2>Current Tickets</h2>
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Issue</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.customer}</td>
                      <td>{ticket.issue}</td>
                      <td>{ticket.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

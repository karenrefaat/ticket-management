import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../css/dashboard.css';
import MenuBar from './menu';
import IssueProgressBar from './issueprogressbar';

const Dashboard = () => {
  const [tickets, setTickets] = useState([
    { id: 1, customer: 'Karen Refaat', issue: 'Login Issue', priority: 'High', status: 'pending' },
    { id: 2, customer: 'Karen Refaat', issue: 'Payment Error', priority: 'Medium', status: 'done' },
    { id: 3, customer: 'Karen Refaat', issue: 'Account Locked', priority: 'Low', status: 'pending' },
    { id: 4, customer: 'Karen Refaat', issue: 'Feature Request', priority: 'Medium', status: 'done' },
  ]);
  const [newTicketId, setNewTicketId] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const newTicket = {
      id: tickets.length + 1,
      customer: data.customer,
      issue: data.issue,
      priority: data.priority,
      status: 'opened'
    };
    setTickets([...tickets, newTicket]);
    reset({
      priority: '',
      customer: '',
      issue: ''
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
                placeholder="Enter customer name" />
              {errors.customer && <span className="error">{errors.customer.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="issue">Issue Description</label>
              <textarea
                id="issue"
                {...register("issue", { required: "Issue description is required" })}
                placeholder="Describe the issue" />
              {errors.issue && <span className="error">{errors.issue.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" {...register("priority", { required: "Priority is required" })}>
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
      </div>
    </div>
  );
};

export default Dashboard;
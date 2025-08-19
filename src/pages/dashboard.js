// export default Dashboard;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/dashboard.css';
import MenuBar from './menu';

const Dashboard = () => {
  const [tickets, setTickets] = useState([
    { id: 1, customer: 'John Doe', issue: 'Login Issue', status: 'Open', priority: 'High' },
    { id: 2, customer: 'Jane Smith', issue: 'Payment Error', status: 'In Progress', priority: 'Medium' },
    { id: 3, customer: 'Bob Johnson', issue: 'Account Locked', status: 'Resolved', priority: 'Low' },
    { id: 4, customer: 'Alice Brown', issue: 'Feature Request', status: 'Open', priority: 'Medium' },
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = (data) => {
    const newTicket = {
      id: tickets.length + 1,
      customer: data.customer,
      issue: data.issue,
      status: 'Open',
      priority: data.priority,
    };
    setTickets([...tickets, newTicket]);
    reset();
  };

  const handleResolve = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="dashboard-container">
      {/* 👇 Use MenuBar here */}
      <MenuBar />

      <div className="main-content">
        <h1 className="dashboard-title">Customer Service Dashboard</h1>
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
              <select id="priority" {...register("priority", { required: "Priority is required" })}>
                <option value="">Select priority</option>
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
                <th>Resolved</th>
                <th>Customer</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleResolve(ticket.id)}
                      title="Mark as resolved"
                    />
                  </td>
                  <td>{ticket.customer}</td>
                  <td>{ticket.issue}</td>
                  <td>{ticket.status}</td>
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
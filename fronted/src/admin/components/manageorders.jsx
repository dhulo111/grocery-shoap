import { useEffect } from "react";
import Adminsidebar from "../Adminsidebar";
import { useState } from "react";
import axios from "../../utility/axiosinstance"
import "../components/manageproduct.css";

function Manageorder() {
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(false);
  let [expandedOrder, setExpandedOrder] = useState(null);

  async function getAllorder() {
    try {
      setLoading(true);
      let data = await axios.get(`/product/getallorder`);
      setOrders(data.data);
    } catch (e) {
      console.log(e);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      await axios.put(`/product/order/${orderId}`, { status: newStatus });
      getAllorder();
      alert("Order status updated successfully!");
    } catch (e) {
      console.log(e);
      alert("Error updating order status");
    }
  }

  useEffect(() => { getAllorder() }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#f59e0b";
      case "shipped":
        return "#3b82f6";
      case "delivered":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={styles.wrapper}>
      <Adminsidebar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📦 Manage Orders</h1>
          <p style={styles.subtitle}>Total Orders: {orders.length}</p>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No orders found</p>
          </div>
        ) : (
          <div style={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                {/* Order Header Bar */}
                <div
                  style={{
                    ...styles.orderHeaderBar,
                    borderLeft: `4px solid ${getStatusColor(order.status)}`
                  }}
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order._id ? null : order._id)
                  }
                >
                  <div style={styles.headerContent}>
                    <div>
                      <p style={styles.orderIdLabel}>Order ID</p>
                      <p style={styles.orderId}>{order._id.substring(0, 12)}...</p>
                    </div>
                    <div>
                      <p style={styles.userIdLabel}>User ID</p>
                      <p style={styles.userId}>{order.userid.substring(0, 10)}...</p>
                    </div>
                    <div>
                      <p style={styles.dateLabel}>Date</p>
                      <p style={styles.date}>{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p style={styles.amountLabel}>Amount</p>
                      <p style={styles.amount}>₹{order.totalAmount}</p>
                    </div>
                  </div>
                  <div style={styles.expandIcon}>
                    {expandedOrder === order._id ? "▲" : "▼"}
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedOrder === order._id && (
                  <div style={styles.expandedContent}>
                    {/* Status Section */}
                    <div style={styles.statusSection}>
                      <h3 style={styles.sectionTitle}>Order Status</h3>
                      <div style={styles.statusRow}>
                        <div style={styles.statusItem}>
                          <label style={styles.label}>Order Status:</label>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            style={{
                              ...styles.statusDropdown,
                              borderColor: getStatusColor(order.status)
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div style={styles.statusItem}>
                          <label style={styles.label}>Payment Status:</label>
                          <span
                            style={{
                              ...styles.paymentStatusBadge,
                              backgroundColor: getStatusColor(order.paymentstatus)
                            }}
                          >
                            {order.paymentstatus?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div style={styles.detailsSection}>
                      <h3 style={styles.sectionTitle}>Payment Details</h3>
                      <div style={styles.detailsGrid}>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Payment ID:</span>
                          <span style={styles.detailValue}>{order.paymentid}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Order ID:</span>
                          <span style={styles.detailValue}>{order.orderid}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Total Amount:</span>
                          <span style={styles.amountValue}>₹{order.totalAmount}</span>
                        </div>
                        <div style={styles.detailItem}>
                          <span style={styles.detailLabel}>Items Count:</span>
                          <span style={styles.detailValue}>{order.items?.length || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items Section */}
                    <div style={styles.itemsSection}>
                      <h3 style={styles.sectionTitle}>Order Items</h3>
                      <div style={styles.itemsList}>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, idx) => (
                            <div key={idx} style={styles.itemRow}>
                              {item.img && (
                                <img
                                  src={`http://localhost:3000/upload/${item.img}`}
                                  alt={item.pname}
                                  style={styles.itemImage}
                                />
                              )}
                              <div style={styles.itemInfo}>
                                <p style={styles.itemName}>{item.pname}</p>
                                <p style={styles.itemDesc}>{item.description}</p>
                                <div style={styles.itemMeta}>
                                  <span>Price: ₹{item.price}</span>
                                  <span>Qty: {item.quentity}</span>
                                  <span>Rating: ⭐{item.rating}</span>
                                  <span style={styles.itemSubtotal}>
                                    ₹{item.price * item.quentity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={styles.noItems}>No items in this order</p>
                        )}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div style={styles.additionalInfo}>
                      <h3 style={styles.sectionTitle}>Additional Info</h3>
                      <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>Signature:</span>
                          <span style={styles.infoValue}>
                            {order.signature?.substring(0, 20)}...
                          </span>
                        </div>
                        <div style={styles.infoItem}>
                          <span style={styles.infoLabel}>Last Updated:</span>
                          <span style={styles.infoValue}>
                            {formatDate(order.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
  },
  container: {
    flex: 1,
    padding: "20px"
  },
  header: {
    marginBottom: "30px"
  },
  title: {
    fontSize: "32px",
    color: "#1f2937",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  loadingContainer: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px"
  },
  emptyText: {
    fontSize: "18px",
    color: "#6b7280"
  },
  ordersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
    gap: "20px"
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  orderHeaderBar: {
    padding: "20px",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    transition: "background-color 0.2s"
  },
  headerContent: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
    flex: 1
  },
  orderIdLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
    fontWeight: "600",
    letterSpacing: "0.05em"
  },
  orderId: {
    fontSize: "14px",
    color: "#1f2937",
    margin: 0,
    fontWeight: "600"
  },
  userIdLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
    fontWeight: "600",
    letterSpacing: "0.05em"
  },
  userId: {
    fontSize: "14px",
    color: "#1f2937",
    margin: 0,
    fontWeight: "600"
  },
  dateLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
    fontWeight: "600",
    letterSpacing: "0.05em"
  },
  date: {
    fontSize: "13px",
    color: "#374151",
    margin: 0
  },
  amountLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase",
    margin: "0 0 4px 0",
    fontWeight: "600",
    letterSpacing: "0.05em"
  },
  amount: {
    fontSize: "16px",
    color: "#10b981",
    margin: 0,
    fontWeight: "700"
  },
  expandIcon: {
    fontSize: "16px",
    color: "#9ca3af",
    marginLeft: "10px"
  },
  expandedContent: {
    padding: "25px",
    borderTop: "1px solid #e5e7eb",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px"
  },
  sectionTitle: {
    fontSize: "14px",
    color: "#1f2937",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 15px 0",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "10px"
  },
  statusSection: {
    gridColumn: "1 / -1"
  },
  statusRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px"
  },
  statusItem: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: "600"
  },
  statusDropdown: {
    padding: "10px 12px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "border-color 0.2s",
    backgroundColor: "white",
    color: "#1f2937"
  },
  paymentStatusBadge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    textAlign: "center"
  },
  detailsSection: {
    backgroundColor: "#f9fafb",
    padding: "15px",
    borderRadius: "8px"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px"
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  detailLabel: {
    fontSize: "11px",
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  detailValue: {
    fontSize: "13px",
    color: "#1f2937",
    fontWeight: "500",
    wordBreak: "break-all"
  },
  amountValue: {
    fontSize: "14px",
    color: "#10b981",
    fontWeight: "700"
  },
  itemsSection: {
    gridColumn: "1 / -1",
    backgroundColor: "#f9fafb",
    padding: "15px",
    borderRadius: "8px"
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  itemRow: {
    display: "grid",
    gridTemplateColumns: "80px 1fr",
    gap: "12px",
    padding: "12px",
    backgroundColor: "white",
    borderRadius: "6px",
    border: "1px solid #e5e7eb"
  },
  itemImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  itemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  itemName: {
    fontSize: "13px",
    color: "#1f2937",
    fontWeight: "600",
    margin: 0
  },
  itemDesc: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0
  },
  itemMeta: {
    display: "flex",
    gap: "12px",
    fontSize: "11px",
    color: "#6b7280",
    flexWrap: "wrap"
  },
  itemSubtotal: {
    color: "#10b981",
    fontWeight: "600"
  },
  noItems: {
    textAlign: "center",
    color: "#6b7280",
    padding: "15px",
    margin: 0
  },
  additionalInfo: {
    gridColumn: "1 / -1",
    backgroundColor: "#f9fafb",
    padding: "15px",
    borderRadius: "8px"
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px"
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  infoLabel: {
    fontSize: "11px",
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  infoValue: {
    fontSize: "12px",
    color: "#1f2937",
    fontWeight: "500",
    wordBreak: "break-all"
  }
};

export default Manageorder;
import { useEffect } from "react";
import axios from "../utility/axiosinstance";
import { useState } from "react";

function Myorder() {
  let [orders, setOrders] = useState([]);
  let userid = localStorage.getItem("userid");

  async function getorder() {
    try {
      let data = await axios.get(`/product/getorder/${userid}`);
      setOrders(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (e) { console.log(e) }
  }

  useEffect(() => { getorder() }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "delivered":
        return "#10b981";
      case "failed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📦 My Orders</h1>
        <p style={styles.orderCount}>Total Orders: {orders.length}</p>
      </div>

      {orders.length > 0 ? (
        <div style={styles.ordersWrapper}>
          {orders.map((order, orderIdx) => (
            <div key={orderIdx} style={styles.orderCard}>
              {/* Order Header */}
              <div style={styles.orderHeader}>
                <div>
                  <p style={styles.orderLabel}>Order ID</p>
                  <p style={styles.orderId}>{order._id}</p>
                </div>
                <div>
                  <p style={styles.orderLabel}>Order Date</p>
                  <p style={styles.orderDate}>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p style={styles.orderLabel}>Status</p>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(order.status)
                  }}>
                    {order.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Items Section */}
              <div style={styles.itemsSection}>
                <h2 style={styles.sectionTitle}>Order Items</h2>
                <div style={styles.itemsContainer}>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} style={styles.itemCard}>
                        {/* Product Image */}
                        <div style={styles.imageContainer}>
                          <img
                            src={`http://localhost:3000/upload/${item.img}`}
                            alt={item.pname}
                            style={styles.productImage}
                          />
                        </div>

                        {/* Product Details */}
                        <div style={styles.itemDetails}>
                          <h3 style={styles.productName}>{item.pname}</h3>
                          <p style={styles.productDescription}>{item.description}</p>

                          <div style={styles.itemMetadata}>
                            <div style={styles.metaItem}>
                              <span style={styles.label}>Price:</span>
                              <span style={styles.value}>₹{item.price}</span>
                            </div>
                            <div style={styles.metaItem}>
                              <span style={styles.label}>Quantity:</span>
                              <span style={styles.value}>×{item.quentity}</span>
                            </div>
                            <div style={styles.metaItem}>
                              <span style={styles.label}>Rating:</span>
                              <span style={styles.value}>⭐ {item.rating}</span>
                            </div>
                          </div>

                          <div style={styles.subtotal}>
                            Subtotal: <strong>₹{item.price * item.quentity}</strong>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={styles.noItems}>No items in this order</p>
                  )}
                </div>
              </div>

              {/* Payment Section */}
              <div style={styles.paymentSection}>
                <h2 style={styles.sectionTitle}>Payment Information</h2>
                <div style={styles.paymentGrid}>
                  <div style={styles.paymentItem}>
                    <p style={styles.paymentLabel}>Payment ID</p>
                    <p style={styles.paymentValue}>{order.paymentid}</p>
                  </div>
                  <div style={styles.paymentItem}>
                    <p style={styles.paymentLabel}>Payment Status</p>
                    <span style={{
                      ...styles.paymentStatusBadge,
                      backgroundColor: getStatusColor(order.paymentstatus)
                    }}>
                      {order.paymentstatus?.toUpperCase()}
                    </span>
                  </div>
                  <div style={styles.paymentItem}>
                    <p style={styles.paymentLabel}>Order Status</p>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(order.status)
                    }}>
                      {order.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Section */}
              <div style={styles.totalSection}>
                <div style={styles.totalRow}>
                  <h3 style={styles.totalLabel}>Total Amount</h3>
                  <h3 style={styles.totalAmount}>₹{order.totalAmount}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No orders found. Start shopping! 🛍️</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "32px",
    color: "#1f2937",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  orderCount: {
    fontSize: "14px",
    color: "#6b7280",
    margin: 0
  },
  ordersWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden"
  },
  orderHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    padding: "25px",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb"
  },
  orderLabel: {
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  orderId: {
    fontSize: "16px",
    color: "#1f2937",
    fontWeight: "600",
    margin: 0,
    wordBreak: "break-all"
  },
  orderDate: {
    fontSize: "16px",
    color: "#1f2937",
    margin: 0,
    fontWeight: "500"
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  itemsSection: {
    padding: "25px",
    borderBottom: "1px solid #e5e7eb"
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#1f2937",
    fontWeight: "600",
    marginTop: 0,
    marginBottom: "20px"
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  itemCard: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  },
  imageContainer: {
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f3f4f6"
  },
  productImage: {
    width: "100%",
    height: "120px",
    objectFit: "cover"
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  productName: {
    fontSize: "16px",
    color: "#1f2937",
    fontWeight: "600",
    margin: "0 0 5px 0"
  },
  productDescription: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 10px 0",
    lineHeight: "1.4"
  },
  itemMetadata: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "10px"
  },
  metaItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px"
  },
  label: {
    color: "#6b7280",
    fontWeight: "500"
  },
  value: {
    color: "#1f2937",
    fontWeight: "600"
  },
  subtotal: {
    fontSize: "14px",
    color: "#374151",
    paddingTop: "10px",
    borderTop: "1px solid #d1d5db",
    fontWeight: "500"
  },
  noItems: {
    textAlign: "center",
    color: "#6b7280",
    padding: "20px"
  },
  paymentSection: {
    padding: "25px",
    borderBottom: "1px solid #e5e7eb"
  },
  paymentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  paymentItem: {
    padding: "15px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  },
  paymentLabel: {
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 8px 0",
    fontWeight: "600"
  },
  paymentValue: {
    fontSize: "14px",
    color: "#1f2937",
    margin: 0,
    fontWeight: "600",
    wordBreak: "break-all"
  },
  paymentStatusBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "white",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  totalSection: {
    padding: "25px",
    backgroundColor: "#f3f4f6",
    borderTop: "2px solid #e5e7eb"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  totalLabel: {
    fontSize: "18px",
    color: "#1f2937",
    fontWeight: "600",
    margin: 0
  },
  totalAmount: {
    fontSize: "28px",
    color: "#10b981",
    fontWeight: "700",
    margin: 0
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  emptyText: {
    fontSize: "18px",
    color: "#6b7280",
    margin: 0
  }
}

export default Myorder;
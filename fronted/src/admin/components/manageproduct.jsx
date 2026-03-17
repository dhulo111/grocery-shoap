import React, { useEffect, useState, useMemo } from 'react'
import Adminsidebar from '../Adminsidebar'
import './manageproduct.css'

const PAGE_SIZE = 8

export default function ManageProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Error')
    } finally { setLoading(false) }
  }

  function openNew() {
    setForm({ name: '', price: '', description: '', image: '' })
    setEditingId(null)
    setModalOpen(true)
  }

  function openEdit(p) {
    setEditingId(p._id || p.id)
    setForm({ name: p.name || '', price: String(p.price || ''), description: p.description || '', image: p.image || '' })
    setModalOpen(true)
  }

  function onChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  async function onFileChange(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((s) => ({ ...s, image: reader.result }))
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      if (!form.name || !form.price) throw new Error('Name and price are required')
      const payload = { ...form, price: Number(form.price) }
      const url = editingId ? `/api/products/${editingId}` : '/api/products'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Save failed')
      await fetchProducts()
      setModalOpen(false)
      setMessage(editingId ? 'Product updated' : 'Product created')
    } catch (err) {
      setMessage(err.message || 'Error')
    } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setProducts((list) => list.filter((p) => (p._id || p.id) !== id))
      setMessage('Product deleted')
    } catch (err) {
      setMessage(err.message || 'Error deleting')
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((p) => (p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q))
  }, [products, query])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  useEffect(() => { if (page > pages) setPage(pages) }, [pages])
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="admin-page">
      <Adminsidebar />

      <main className="admin-main">
        <div className="manage-header">
          <h2>Manage Products</h2>
          <div className="manage-actions">
            <input placeholder="Search products" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} />
            <button className="btn" onClick={openNew}>New Product</button>
          </div>
        </div>

        {message && <div className="message">{message}</div>}

        <section className="product-grid">
          {loading && <div>Loading...</div>}
          {!loading && visible.length === 0 && <div className="muted">No products</div>}
          {visible.map((p) => {
            const id = p._id || p.id
            return (
              <div className="card product" key={id}>
                <div className="thumb"><img src={p.image || '/placeholder.png'} alt={p.name} /></div>
                <div className="info">
                  <div className="title">{p.name}</div>
                  <div className="desc">{p.description}</div>
                  <div className="meta">${p.price}</div>
                </div>
                <div className="card-actions">
                  <button className="btn small" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn small danger" onClick={() => handleDelete(id)}>Delete</button>
                </div>
              </div>
            )
          })}
        </section>

        <div className="pagination">
          <button className="btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>Page {page} / {pages}</span>
          <button className="btn" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>

        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>{editingId ? 'Edit Product' : 'New Product'}</h3>
              <form onSubmit={handleSubmit}>
                <label>Name<input name="name" value={form.name} onChange={onChange} required /></label>
                <label>Price<input name="price" value={form.price} onChange={onChange} required type="number" step="0.01" /></label>
                <label>Image (URL or upload)
                  <input name="image" value={form.image} onChange={onChange} placeholder="Paste image URL or upload below" />
                </label>
                <label>Upload image
                  <input type="file" accept="image/*" onChange={onFileChange} />
                </label>
                {form.image && <div className="preview"><img src={form.image} alt="preview" /></div>}
                <label>Description<textarea name="description" value={form.description} onChange={onChange} /></label>

                <div className="form-actions">
                  <button type="submit" className="btn primary" disabled={saving}>{saving ? 'Saving...' : (editingId ? 'Update' : 'Create')}</button>
                  <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../api'

type Product = {
  id: string
  title: string
  description?: string
  price: string
  images?: { url: string }[]
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    let mounted = true
    getProducts()
      .then((data) => {
        if (!mounted) return
        setProducts(data || [])
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const skeletons = Array.from({ length: 9 })

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Revestidas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? skeletons.map((_, i) => <ProductCard key={i} loading />)
          : products.map((p) => (
              <ProductCard
                key={p.id}
                title={p.title}
                description={p.description}
                price={p.price}
                image={p.images && p.images[0] ? p.images[0].url : '/assets/placeholder.png'}
              />
            ))}
      </div>
    </main>
  )
}

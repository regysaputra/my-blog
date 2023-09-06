import React from 'react'
import Link from 'next/link'
import { getCategories } from '@/services'

export default function Header() {
  const [categories, setCategories] = React.useState([])

	React.useEffect(() => {
		getCategories().then((newCategories) => setCategories(newCategories))
	}, [])

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {
            categories.map(category => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className="mt-2 align-middle text-white ml-4 font-semibold cursor-pointer md:float-right">
                  {category.name}
                </span>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

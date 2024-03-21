import React from 'react'
import { Document } from '../_utils/types'
import Link from 'next/link'

const Document = ({ document: d, index }: { document: Document, index: number }) => {
    return (
        <Link href={`/documents/${d.id}`}>
            <div
                key={d.id}
                className={`block p-6 border rounded my-2 ${index % 2 != 0 ? 'border-gray-100 bg-gray-100' : ''}`}

            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    <a href="#">{d.title}</a>
                </h5>
                <p className="font-normal text-gray-700 mb-2">
                    <a href="#">Version: {d.version}</a>
                </p>
                <p className="font-normal text-gray-700 mb-2">
                    <a href="#">{d.ministry}</a>
                </p>
                <p className="font-normal text-gray-700 mb-2">
                    Time added: {d.addedTime}
                </p>
                <p className="font-normal text-gray-700 line-clamp-1">
                    {d.description}
                </p>
            </div>
        </Link>
    )
}

export default Document
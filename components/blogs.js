import React, { useState } from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
// import { blogData } from './blogData';

const Blogs = ({ blogData }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchData = blogData.filter(val => {
    if (searchTerm === "") {
      return val
    }
    else if (val.tags.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
    else if (val.heading.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  })

  return (
    <div className={styles.container}>
      <form className="text-center" action="" method="post">
        <input className="border-2 rounded focus:outline-none	" type="text" placeholder="Search here" onChange={e => setSearchTerm(e.target.value)} />
      </form>
      {
        searchData.length ?
          <div className="flex flex-wrap my-7 justify-center">
            {
              searchData.map((b, i) => {
                return (
                  <div key={b.id} className="p-4 bg-white sm:w-1 md:w-1/2 lg:w-1/3   overflow-hidden">
                    <div className={styles.cardHeader}>
                      <Image src={b.image} ></Image>
                      <div className="mt-4">
                        <Link href={`/${b.id}`} >{b.heading}</Link>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <div className="flex-auto">
                        <div className={`flex ${styles.author}`}>
                          <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                          <span><small>{b.name}</small></span>
                        </div>

                      </div>
                      <div className="flex-auto"><small>&#x25C8; {b.tags}</small>
                      </div>
                      <div className="flex-auto"><small>&#x25C8; {b.date}</small>
                      </div>
                    </div>
                    <div className="mt-4 mb-3">
                      <span>{b.details}</span>
                    </div>
                  </div>
                )
              })
            }
          </div> :
          <div className='my-14'>
            <p className='text-center text-2xl'>Not found!</p>
          </div>
      }
    </div>
  );
};

export default Blogs;



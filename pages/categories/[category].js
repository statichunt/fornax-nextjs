import React from 'react';
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image';
import styles from '../../styles/tagname.module.css';
import Head from 'next/head';
import { marked } from 'marked';
import { getPosts } from '../../lib/posts';
import { getAuthor } from '../../lib/author';
import { kebabCase } from '../../utils/kebabcase';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllCategory } from '../../lib/category';


const Category = ({ post, category, authors }) => {
  const blogsByTag = post.filter((p) => p.length > 0);
  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <Head>
        <title>tagname | {category}</title>
      </Head>
      <div className="my-7 text-center m-auto">
        <h3 className="text-h3_sm md:text-h3 text-bold">All <span className="text-primaryColor"> {category}</span> Categories blogs are here</h3>
      </div>

      <div className={`my-14 flex flex-wrap justify-center container m-auto ${styles.container}`}>
        {
          blogsByTag[0].map((r, i) => {
            return (
              <div key={i} className="p-4 bg-body md:w-1/2 lg:w-1/3  overflow-hidden">
                <div >
                  <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                  <div className="mt-4">
                    <Link href={`/blog/${r.slug}`} ><a className="text-textColor hover:text-primaryColor">{r.frontmatter.title}</a></Link>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="sm:mr-4 mr-1">
                    <div className={`flex ${styles.author}`}>
                      {
                        authors.map((a, i) => a.frontmatter.name === r.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${kebabCase(r.frontmatter.author)}`}><a className="text-textLight">{r.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small className="text-textLight">&#x25C8; {new Date(r.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    {
                      r.frontmatter.category.map((c, i) => (
                        <Link key={i} href={`/category/${kebabCase(c)}`} >
                          <a className={`text-textLight ml-0 md:ml-1 ${styles.tags}`}>&#x25C8; {c}</a>
                        </Link>
                      ))
                    }
                  </div>

                </div>
                <div className="mt-4 mb-3 text-small md:text-large text-textLight">
                  <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 130) + ' ...' }}></span>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const category = getAllCategory();
  const paths = Object.keys(category).map((c) => ({
    params: {
      category: c,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const authors = getAuthor()
  const file = fs.readdirSync(path.join("content/posts"));
  const posts = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content/posts", file),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);
    const filter = frontmatter.category.filter(
      (c) => kebabCase(c) == params.category
    );

    const post = getPosts();
    const data = post.filter(function (e) {
      return e.frontmatter.category.some(function (a) {
        return filter.indexOf(a) != -1;
      });
    });

    return data;
  });

  return { props: { post: posts, category: params.category, authors } };
}


export default Category;

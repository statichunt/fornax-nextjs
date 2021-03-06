import { useForm } from 'react-hook-form';
import Head from 'next/head';
import airForm from '../../config/config.json';
import { getContactData } from '../../lib/contact';


const Contact = ({ contact }) => {
  const { register, errors } = useForm();
  const email = airForm.parameter.contactFormAction;

  return (
    <>
      <Head>
        <title>{contact.frontmatter.title}</title>
      </Head>
      <div className={`my-10 sm:my-16 md:my-24`}>
        <h1 className="text-center text-textColor text-h2 font-bold mb-10">Contact Me</h1>
        <div className={` flex justify-center items-center `}>
          <div className="mx-auto w-full max-w-2xl rounded-xl px-4">
            <form
              action={email} method="post"
              className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'You must enter your name',
                    },
                  })}
                  className={`block w-full py-3 border-2 px-4 placeholder-textLight focus:outline-none focus:border-sky-200 focus:ring-sky-200  focus:ring-1 focus:ring-offset-1 ${errors ? '' : null
                    }`}
                  placeholder="Full name"
                />
                <span className="text-red-400 text-sm py-2">
                  {errors?.name?.message}
                </span>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'You must enter your email address',
                    },
                    minLength: {
                      value: 8,
                      message: 'This is not long enough to be an email',
                    },
                    maxLength: {
                      value: 120,
                      message: 'This is too long',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'This needs to be a valid email address',
                    },
                  })}
                  className={`block w-full py-3 border-2 px-4 placeholder-textLight focus:outline-none focus:border-sky-200 focus:ring-sky-200  focus:ring-1 focus:ring-offset-1 ${errors ? '' : null
                    }`}
                  placeholder="Email"
                />
                <span className="text-red-400 text-sm py-2">
                  {errors?.email?.message}
                </span>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  {...register('phone')}
                  className="block w-full py-3 border-2 px-4 placeholder-textLight focus:outline-none focus:border-sky-200 focus:ring-sky-200  focus:ring-1 focus:ring-offset-1"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  rows="4"
                  {...register('message', {
                    required: {
                      value: true,
                      message: 'You need to enter your message',
                    },
                    maxLength: {
                      value: 1000,
                      message: "Your message can't be more than 1000 characters",
                    },
                    minLength: {
                      value: 20,
                      message: 'Your message must be longer than this!',
                    },
                  })}
                  className={`block w-full py-3 border-2 px-4 placeholder-textLight focus:outline-none focus:border-sky-200 focus:ring-sky-200  focus:ring-1 focus:ring-offset-1 ${errors ? '' : null
                    }`}
                  placeholder="Message"></textarea>
                <span className="text-red-400 text-sm py-2">
                  {errors?.message?.message}
                </span>
              </div>
              <div className="text-right">
              <button
                  type="submit"
                  className="  primary-button transition duration-300 ease-in-outs bg-primaryColor hover:bg-black">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const contact = getContactData();
  return {
    props: {
      contact
    }
  }
}

export default Contact;
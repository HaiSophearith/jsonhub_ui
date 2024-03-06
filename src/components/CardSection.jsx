import React from 'react'
import icon1 from '../asset/icon/Vector1.png'
import icon2 from '../asset/icon/Vector2.png'
import icon3 from '../asset/icon/Vector3.png'

export default function CardSection() {
    return (
        <div className='px-24 mt-24 flex justify-center 12pro:px-7'>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-10'>
                {/* card */}
                <div className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            API mocking that saves you time
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                            Get working mock REST APIs in seconds with an intuitive and easy-to-use interface.Run them everywhere with the CLI.
                        </p>
                    </div>
                    <img src={icon1} alt="vector1" className='ml-6' />
                </div>

                {/* card 2 */}
                <div className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Integrates with your workflow
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                            Compatible with the OpenAPI specification, Mockoon integrates perfectly with your existing applications and API design workflow.
                        </p>
                    </div>
                    <img src={icon2} alt="vector1" className='h-24 ml-6' />
                </div>

                {/* card 3 */}
                <div className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Complete tooling
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                            Go beyond mocking with advanced features and tackle the most complex situation with HTTP requests recording, proxying, integration testing, etc.
                        </p>
                    </div>
                    <img src={icon3} alt="vector1" className='w-32 h-28 ml-6' />
                </div>

                {/* card 4 */}
                <div className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Developer Friendly
                        </h5>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-3">
                            Mocky is compatible with JS, Mobile and Server applications, featuring CORS, JSONP and GZIP responses.No authentication, just call it!
                        </p>
                    </div>
                    <img src={icon1} alt="vector1" className='ml-6' />
                </div>
            </div>
        </div>
    )
}

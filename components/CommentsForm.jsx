import { submitComment } from '@/services'
import React from "react"

export default function CommentsForm({ slug }) {
	const [error, setError] = React.useState(false)
	const [localStorage, setLocalStorage] = React.useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)
	const commentEl = React.useRef()
	const nameEl = React.useRef()
	const emailEl = React.useRef()
	const storeDataEl = React.useRef()

  React.useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem("email")
  }, [])

	const handleCommentSubmission = (e) => {
    e.preventDefault()
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if(!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if(storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true)

        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
      })
  }

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a reply</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentEl}
					name="comment"
					id="comment"
					className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Comment"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
				<input
					type="text"
					ref={nameEl}
					className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					name="name"
					id="name"
					placeholder="Name"
				/>
				<input
					type="email"
					ref={emailEl}
					className="p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					name="email"
					id="email"
					placeholder="email"
				/>
			</div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true"/>
          <label htmlFor="storeData" className="text-gray-500 cursor-pointer ml-2">Save my e-mail and name for the next time I comment.</label>
        </div>
      </div>
			{error && <p className="text-xs text-red-500">All fields are required</p>}
			<div className="mt-8">
				<button
					type="button"
					onClick={handleCommentSubmission}
          className="transition duration-500 ease inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer hover:bg-indigo-900"
				>
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
			</div>
		</div>
	)
}

import React from 'react'

export default function CategoryForm({handleSubmit, value, setValue}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
         <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter New Cateogry" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary bg-primary">Submit</button>
      </form>
    </>
  )
}

import { useState } from 'react'

export default function AdminHome() {
    const [loadTemplate, setLoadTemplate] = useState([]);
    const [formData, setFormData] = useState([]);

    function onAddBtnClick() {
        setLoadTemplate(loadTemplate.concat(<div key={loadTemplate.length}>
            {/* que template start*/}
            <div className="my-3 border border-secondary px-3 py-3 rounded">
                {/* question id */}
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Enter Question ID</label>
                    <input type="text" className="form-control" name="id[]" id="id" placeholder="Enter Question ID" onChange={handleInputChange} required />
                </div>

                {/* question */}
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Enter Question</label>
                    <input type="text" className="form-control" name="question[]" id="question" placeholder="Enter Question" onChange={handleInputChange} required />
                </div>

                {/* options */}
                <div className="row">
                    <label htmlFor="option-3" className="form-label">Enter Options</label>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <input type="text" className="form-control" name="option0[]" id="option0" placeholder="First Option" onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <input type="text" className="form-control" name="option1[]" id="option1" placeholder="Second Option" onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <input type="text" className="form-control" name="option2[]" id="option2" placeholder="Third Option" onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>
            </div>
            {/* que template end*/}
        </div>));
        console.log(loadTemplate.length, 45)
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // original formdata
        setFormData(formData);

        const finalFormData = [
            {
                "id": formData.id,
                "question": formData.question,
                "options": [formData.option0, formData.option1, formData.option2]
            }
        ]
        console.log(finalFormData);
        alert(JSON.stringify(finalFormData));
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <h1 className="text-center">Welcome to Admin Portal</h1>
                        <button className="btn btn-warning fw-bold" onClick={onAddBtnClick}>Add</button>

                        {/* Add questions form start */}
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <div>
                                {/* que template start*/}
                                <div className="my-3 border border-secondary px-3 py-3 rounded">
                                    {/* question id */}
                                    <div className="mb-3">
                                        <label htmlFor="id" className="form-label">Enter Question ID</label>
                                        <input type="text" className="form-control" name="id" id="id" placeholder="Enter Question ID" onChange={handleInputChange} required />
                                    </div>

                                    {/* question */}
                                    <div className="mb-3">
                                        <label htmlFor="question" className="form-label">Enter Question</label>
                                        <input type="text" className="form-control" name="question" id="question" placeholder="Enter Question" onChange={handleInputChange} required />
                                    </div>

                                    {/* options */}
                                    <div className="row">
                                        <label htmlFor="option-3" className="form-label">Enter Options</label>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" name="option0" id="option0" placeholder="First Option" onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" name="option1" id="option1" placeholder="Second Option" onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <input type="text" className="form-control" name="option2" id="option2" placeholder="Third Option" onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* que template end*/}
                            </div>
                            {loadTemplate}
                            <div className="d-flex flex-column">
                                <button type="submit" className="btn btn-warning mt-3">Submit</button>
                            </div>
                        </form>
                        {/* Add questions form end */}

                        <a href="/admin" className="btn btn-dark my-3">Logout</a>
                    </div>
                </div>
            </div>
        </>
    )
}

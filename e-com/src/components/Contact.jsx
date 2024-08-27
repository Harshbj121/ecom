import ContactImg from "../images/contact-pic.jpg"

const Contact = () => {
  return (
    <div className="container">
        <h1 className="text-center h1">Contact Us</h1>
        <div className="row " style={{margin: "50px"}}>
            <div className="col-sm-6 col-md-6 col-lg-6"><img src={ContactImg} alt="" className="w-100 h-100 "/></div>
            <div className="col-sm-6 col-md-6 col-lg-6">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" className="form-control" rows="2"></textarea>
                    </div>
                    <button className="btn btn-primary mt-3 w-100">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact
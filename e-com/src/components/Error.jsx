import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError();
    const { data, status, statusText } = err;
    return (
        <div className='ps-3 pt-3'>
            <h1>Oops something went wrong !!</h1>
            <h2>{data}</h2>
            <h3>{`${status} ${statusText}`}</h3>
            <p>Click <Link to="/">here</Link> to go to home page .</p>
        </div>
    )
}

export default Error
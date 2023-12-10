import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdatePersonForm() {
    // const INIT_STATE = {
    //     name: '',
    //     age: '',
    //     location: '',
    //     favoriteColor: ''
    // }

    const navigate = useNavigate()

    const [data, setData] = useState('')
    const { id } = useParams()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        async function getPerson() {
            const url = `${process.env.REACT_APP_BACKEND_URL}/person/${id}`
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
        }
        getPerson()
    }, [])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        data.age = Number(data.age)

        const url = `${process.env.REACT_APP_BACKEND_URL}/person/update/${id}`
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 202) {
            setErrorMessage('Error creating user')
        } else {
            if (errorMessage) setErrorMessage('')
            await navigate(`/person/${id}`, { replace: true })
        }
    }

    const display = data && (
        <div>
            {errorMessage && <h3>{errorMessage}</h3>}
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} required name='name' placeholder='name' value={data.name} />
                <input onChange={handleChange} required name='age' placeholder='age' value={data.age} />
                <input onChange={handleChange} required name='location' placeholder='location' value={data.location} />
                <input onChange={handleChange} name='favoriteColor' placeholder='favorite color' value={data.favoriteColor} />
                <input type='submit' />
            </form>
        </div>
    )

    return (
        <div>
            {display}
        </div>
    )
}

export default UpdatePersonForm
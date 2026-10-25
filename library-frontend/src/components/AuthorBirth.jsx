import { useState } from 'react'

import { ALL_AUTHORS, EDIT_NUMBER } from '../query/query'
import { useMutation, useQuery } from '@apollo/client/react'

const AuthorBirth = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const result = useQuery(ALL_AUTHORS)
    const [editAuthor] = useMutation(EDIT_NUMBER, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const authors = result.data?.allAuthors ?? []
    if (!props.show) {
        return null
    }
    if (result.loading) {
        return <div>loading...</div>
    }

    const submit = (event) => {
        event.preventDefault()
        editAuthor({ variables: { name, setBornTo: parseInt(born) } })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="author">name</label>
                    <select
                        id="author"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    >
                        <option value="">--Please choose an author--</option>
                        {authors.map((v) => (
                            <option key={v.name} value={v.name}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>
                        born
                        <input
                            type="number"
                            value={born}
                            onChange={({ target }) => setBorn(target.value)}//we can also use event.target.value but its' same but this is just destrcut the object
                        />
                    </label>
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorBirth
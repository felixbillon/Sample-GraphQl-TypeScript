interface User {
    id: number,
    firstName: string,
    lastName: string,
    posts?: number[]
}

interface Post {
    id: number,
    title: string,
    text: string
}

export const users: User[] = [
    {
        id: 1,
        firstName: 'Shelia',
        lastName: 'Crawford',
        posts: [1, 2]
    },
    {
        id: 2,
        firstName: 'Lynn',
        lastName: 'Medina'
    },
    {
        id: 3,
        firstName: 'Eric',
        lastName: 'Willis',
        posts: [3]
    }

]

export const posts: Post[] = [
    {
        id: 1,
        title: 'Introduce GraphQL',
        text: '...',
    },
    {
        id: 2,
        title: 'TypeScript is awesome',
        text: '...'
    },
    {
        id: 3,
        title: 'Paris TypeScript #10',
        text: '...'
    }
]
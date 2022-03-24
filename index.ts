import exprees from 'express'
import db from './models'
import { projects } from './seeders/projects'
import { userprojectassigments } from './seeders/userprojectassigments'
import { users } from './seeders/users'

const app = exprees()
const port = process.env.PORT || 3000

const createUsers = () => {
    users.map((user) => {
        db.User.create(user)
    })
}

const createProjects = () => {
    projects.map((project) => {
        db.Project.create(project)
    })
}

const createUserProjectAssigments = () => {
    userprojectassigments.map(userprojectassigment => {
        db.UserProjectAssigments.create(userprojectassigment)
    })
}

// createUsers()
// createProjects()
// createUserProjectAssigments()
app.get('/', (req, res) => {

    db.User.findAll({
        include: {
            model: db.Project
        }
    }).then((users: object) => res.json(users))
    .catch((err: object) => console.log(err))

})

db.sequelize.sync().then(() => {
    app.listen(port, () => {

        console.log('App listening on port ' + port)

    })
})
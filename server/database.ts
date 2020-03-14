
import * as _ from 'lodash';
import {LESSONS, USERS} from "./database-data";
import {DbUser} from "./db-user";


// database to hold users
class InMemoryDatabase {

    // some key generation
    userCounter = 0;

    readAllLessons() {
        return LESSONS;
    }

    // save user
    createUser(email:string,passwordDigest:string) {

        const usersPerEmail = _.keyBy( _.values(USERS), "email" );

        if (usersPerEmail[email]) {
            const message = "An user already exists with email " + email;
            console.error(message);
            throw new Error(message);
        }

        // increment id counter
        this.userCounter++;

        // crate new id
        const id = this.userCounter;

        // create new user
        const user: DbUser = {
            id,
            email,
            passwordDigest
        };

        // store in database
        USERS[id] = user;

        console.log(USERS);

        // return the user
        return user;
    }


    findUserByEmail(email:string) :DbUser {

        const users = _.values(USERS);



        return _.find(users, user => user.email === email);
    }

}




export const db = new InMemoryDatabase();



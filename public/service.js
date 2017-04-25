angular.module("userSerivce", [])
    .factory("manageService", function($http) {
        var users = [
            { id: 1, fName: 'Hege', lName: "Pege", sex: "female", age: "13" },
            { id: 2, fName: 'Kim', lName: "Pim", sex: "male", age: "24" },
            { id: 3, fName: 'Sal', lName: "Smith", sex: "male", age: "43" },
            { id: 4, fName: 'Jack', lName: "Jones", sex: "female", age: "19" },
            { id: 5, fName: 'John', lName: "Doe", sex: "male", age: "12" },
            { id: 6, fName: 'Peter', lName: "Pan1", sex: "female", age: "13" }
        ];
        uid = users[users.length - 1].id + 1;
        return {
            deleteUser: function(id) {
                console.log("factory deleteUser: " + id);
                if (id != undefined) {
                    users.splice(users.findIndex(x => x.id == id), 1);
                }
            },
            getAllUsers: function() {
                return users;
            },
            editUser: function(index, id, fName, lName, sex, age) {
                console.log("factory edit user method");
                users[index] = { id, fName, lName, sex, age };
            },
            addUser: function(fName, lName, sex, age) {
                console.log("factory add user method");
                users.push({
                    id: uid,
                    fName: fName,
                    lName: lName,
                    sex: sex,
                    age: age
                });
                uid++;
            },
            getAllUsersFromNode: function() {
                return $http.get('http://localhost:8888/api/user');
            },
            deleteUserFromNode: function(id) {
                console.log("delete user from node");
                return $http.delete('http://localhost:8888/api/user/' + id);
            },
            editUserFromNode: function(id, fName, lName, sex, age, title) {
                console.log("edit user from node");
                var body = {
                    fName: fName,
                    lName: lName,
                    sex: sex,
                    age: age,
                    title: title
                };
                return $http.put('http://localhost:8888/api/user/' + id, body);
            },
            addUserToNode: function(fName, lName, sex, age, title) {
                console.log("add user to node");
                var body = {
                    fName: fName,
                    lName: lName,
                    sex: sex,
                    age: age,
                    title: title
                };
                return $http.post('http://localhost:8888/api/user', body);

            },
            getUserById: function(id) {
                return $http.get('http://localhost:8888/api/user/' + id);
            }
        }
    });
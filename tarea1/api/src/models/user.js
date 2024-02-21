class User {
    find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([...mockUsers]); // Clon
            }, 1000);
        });
    }

    insert(newUser){
        mockUsers.push(newUser);
    }
}

module.exports = User;
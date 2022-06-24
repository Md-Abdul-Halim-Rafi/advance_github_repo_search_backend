const searchedRepositories = async () => {

    try {

        return { status: 200 };
        
    } catch (err) {
        
        console.error(err);

        return { status: 500, msg: "Internal Server Error" };
    }
}

module.exports = { searchedRepositories };
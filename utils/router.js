import Router from "next/router";

const goTo = (route, params = {}) => {
    Router.push({
        pathname: route,
        query: { ...params },
    })
}

export default goTo
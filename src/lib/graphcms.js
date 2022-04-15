import {GraphQLClient, gql} from "graphql-request";

const graphqlAPI = process.env.REACT_APP_PUBLIC_GRAPHCMS_ENDPOINT
const graphcmsToken = process.env.REACT_APP_GRAPHCMS_TOKEN

export const submitOrder = async (token, name, phoneNumber, location, email) => {
    const graphQlClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${graphcmsToken}`
        }
    })

    const query = gql`
    mutation CreateOrder {
        createOrder(
            data: {
                checkoutTokenId: "${token}",
                phoneNumber: "${phoneNumber}",
                name: "${name}",
                location: "${location}",
                email: "${email}",
            }
        ) {
            id
            name
            phoneNumber
            checkoutTokenId
            location
            email
        }
    }`

    const result = await graphQlClient.request(query)
        .then(res => console.log(res))
}
// Retrieves list of flats from data.gov

import { Flat } from "./types"
const getFlats = (): Promise<Flat[]> => {
    return fetch('https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=200000')
    .then(res => res.json())
    .then(data => data.result.records)
}

export { getFlats }
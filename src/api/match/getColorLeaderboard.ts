import { AxiosResponse } from "axios";
import { apiClient } from "../axios";


const getColorLeaderboard = async (props: {type_id : string}) => {
    try {
        const response: AxiosResponse = await apiClient.get("/colors/leaderboards",
            {
                params:{
                    type_id : props.type_id
                }
            }
        )
        
        if (response.status == 200) {
            const data = response.data;
            
            return { success: true, data :  data }
        } else {
            return { success: false }
        }
        
    } catch (error) {
        console.error(error)
    }
}


export { getColorLeaderboard }
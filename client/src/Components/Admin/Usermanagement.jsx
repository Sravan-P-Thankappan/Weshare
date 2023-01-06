import React, { useEffect, useState, useReducer } from 'react'
import axios from '../../Axios'


function Usermanagement() {

    const [reducer, dispatch] = useReducer(x => x + 1, 0)

    const [totalusers, setTotalUsers] = useState([])
    
    useEffect(() => {

        axios.get('/admin/users').then((response) => {
            const { data } = response
            console.log("response  ", data);
            setTotalUsers(data)
        })
    }, [reducer])

    const handleBlock = (userId) => {
        
        console.log(userId);

      let token =  localStorage.getItem('admintoken')

        let config = {
            headers: {
                'id':userId,
                'token':token
            }
        }

        axios.get('/admin/block',config).then(() => {
            console.log('success');
            localStorage.removeItem('usertoken')
            dispatch()

        }).catch((er) => {

            console.log(er.message);
        })
    }

    const handleUnblock = (userId) => {

         console.log(userId);
         let token =  localStorage.getItem('admintoken')


        let config = 
        {
            headers: {
                'id':userId,
                'token':token
            }
        }

        axios.get('/admin/unblock/',config).then(() => {
            console.log('success');
            dispatch()

        }).catch((er) => {

            console.log(er.message);
        })

    }

    return (

        <div class="table w-full p-2 ">
            <table class="w-full border shadow-lg">
                <thead>
                    <tr class="bg-gray-50 border-b">

                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                No

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Name

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Email

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Phone

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Report Status

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Action

                            </div>
                        </th>
                    </tr>
                </thead>


                <tbody>

                    {totalusers.map((user, index) => {

                        return (

                            <tr class="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td class="p-2 border-r">{index + 1}</td>
                                <td class="p-2 border-r">{user.name}</td>
                                <td class="p-2 border-r">{user.email}</td>
                                <td class="p-2 border-r">{user.phone}</td>
                                {user.status ? <td class="p-2 border-r">True</td> : <td class="p-2 border-r">False</td>}

                                <td class='py-3'>
                                    {
                                        user.status ? <button class='bg-green-500 rounded-sm p-2 text-white hover:shadow-lg text-xs font-thin'
                                            onClick={() => { handleUnblock(user._id) }}

                                        >Unblock</button> :
                                            <button class='bg-red-500 rounded-sm p-2 text-white hover:shadow-lg text-xs font-thin'
                                                onClick={() => { handleBlock(user._id) }}

                                            >Block</button>
                                    }

                                </td>

                            </tr>
                        )
                    })


                    }



                </tbody>
            </table>
        </div>




    )
}

export default Usermanagement
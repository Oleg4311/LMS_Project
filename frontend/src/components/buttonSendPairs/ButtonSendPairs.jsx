import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initGroupAC } from '../../store/group/actionsCreators';
import { initPairsAC } from '../../store/pairs/actionsCreators';
import { initUserInfoAC } from '../../store/userInfo/actionsCreators';
import FormDialog from '../form/Form';


function getShuffledArr(array) {
    let result = [], source = array.concat([]);
  
    while (source.length) {
      let index = Math.floor((Math.random()-0.5) * source.length);
      result.push(source.splice(index, 1)[0]);
   }
  
    if(result === array){
        result.reverse();
    }
  
    return result;
  }
  
  function getPairs(arr, num = 2){
      const res = getShuffledArr(arr)
      let pairs = [];
      for (let i = 0; i < res.length; i=i+num) { 
        if(res.length % 2 === 0){
        pairs.push(res.slice(i, i+num).map((el) => el.name + ' ' + el.surname));
        } else {
          const popped = res.pop();
          pairs.push(res.slice(i, i+num).map((el) => el.name + ' ' + el.surname));
          pairs.at(-1).push(popped.name + ' ' + popped.surname)
        }
      }
      return pairs;
  }


  function getJustPairs(arr){
    const res = getShuffledArr(arr)
    const pairs = [];
    let idx = Math.floor((Math.random()-0.5) * arr.length)
    for (let i = 0; i < res.length/2; i++) { 
      if(res.length % 2 === 0){
        pairs.push([res[2*i].name + ' ' + res[2*i].surname, res[2*i+1].name + ' ' + res[2*i+1].surname])
      } else {
        const popped = res.pop();
        pairs.push([res[2*i].name + ' ' + res[2*i].surname, res[2*i+1].name + ' ' + res[2*i+1].surname])
        pairs.at(-1).push(popped.name + ' ' + popped.surname)
      }
    }
    return pairs;
}

export default function ButtonSendPairs() {

    const dispatch = useDispatch();

    const {id} = useParams();
    
    const group = useSelector((store) => store.group);
    const users = useSelector((store) => store.userInfo);
    const myGroup = group[0]?.Users;
    const myGroupName = group[0]?.name;


    const getMyPairs = (num) => {
      if (group.length) {
        let myArrPairs = [];
        for (let index = 0; index < 12; index++) {
          if(index < 8){
          let row = getJustPairs(users);
          myArrPairs.push(row)
        } else {
        let row = getPairs(users, num);
          myArrPairs.push(row)
        }
      }
        return myArrPairs;
      }
      }
    
      
      const putCurrentArr = async (num) => {
        
        const getArr = getMyPairs(num);
          
          const response = await fetch(
            `http://localhost:3100/pairs`,
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      data: getArr?.length ? getArr : [],
                      group_id: id,
                      group_name: myGroupName || "TestName",
                  }),
              }
              )
              dispatch(initPairsAC())
      };
      
      
      const handleClick = (num) => {
        putCurrentArr(num);
        dispatch(initPairsAC());
        dispatch(initUserInfoAC(id));
      }
      

    //     const thisHandleClick = useCallback(
    //   (num) => {
    //     putCurrentArr(num);
    //     // dispatch(initPairsAC());
    //     // dispatch(initUserInfoAC(id));
    //   },
    //   [],
    // )

      React.useEffect(() => {
        dispatch(initGroupAC(id));
        dispatch(initPairsAC());
        dispatch(initUserInfoAC(id));
      }, []);

  return (
      <>
        {/* <Button size="small" onClick={() => {handleClick()}}>
          Создать пары
        </Button> */}
        <FormDialog handleClick={handleClick}/>    
      </>
  );
}
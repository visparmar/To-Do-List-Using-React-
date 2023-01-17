import React,{useState,useEffect} from "react"
import './todo.css'

// get the local storage date

const getLocalData=()=>{
    const localList=localStorage.getItem("myToDoList");
    if(localList){
        return JSON.parse(localList);  
    }else{
        return [];
    }
}

const Todo = () => {

    const [name,setName]=useState("");
    const [item,setItem]=useState(getLocalData());
    const [isEdit,setIsEdit]=useState("");
    const [toggle,setToggle]=useState(false);



    const additem=()=>{
        
        if(name===""){
            alert("Please!..Fill the Date");
        }else if(toggle===true){
             setItem( item.map((curr)=>{
                  if(curr.id===isEdit){
                    return {...item,name:name}
                  }else{
                    return curr
                  }
              })
             )
             setToggle(false);
             setName("");
        }
        else{
            const newData={
                id:new Date().getTime().toString(),
                name:name
            };
            
            setItem([...item,newData]);
            setName("");
        }
    
    }

  
   
    const deleteItem=(ele)=>{
          const updateList=item.filter((curr)=>{
              return curr.id!==ele;
          })
          setItem(updateList);
    }
    const updateItem=(ele)=>{
        const updateEle=item.find((curr)=>{
            return curr.id===ele
        })
        setIsEdit(ele);
        setName(updateEle.name);
        setToggle(true);

    }
    
useEffect(()=>{
   localStorage.setItem("myToDoList",JSON.stringify(item));
},[item]);


    return (
        <div className="main">

            <div className="main-container">
                <figure>
                    <img src='/calender.svg' alt="this is images" />
                    <figcaption>Add your list here &#9996;</figcaption>
                </figure>
                <div className="add-item">
                    <input type="text" placeholder="✍️ add Items..." value={name} className="form-control" id="txtbox" onChange={event=>setName(event.target.value)}/>
                    <i className={toggle===false?"fa-solid fa-plus":"fa-solid fa-pen-to-square"} onClick={additem} ></i>
                </div>

                {/* Item fell down here....... */}
                <div className="item-fell">
                     {item.map((ele,index)=>{
                        return(
                            <div className="list" key={index}>
                            <span>{ele.name}</span>
                            <i className="fa-solid fa-pen-to-square" onClick={()=>updateItem(ele.id)}></i>
                            <i className="fa-solid fa-trash-can" onClick={()=>deleteItem(ele.id)}></i>
                            </div>
                        );
                     })}
                   

                </div>
                {/* Item fell down here....... */}
                <div className="btn-container">
                  
                    <div className="button2" onClick={()=>setItem([])}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Remove All
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Todo;
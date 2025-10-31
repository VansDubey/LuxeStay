import React from 'react'

const Perks = ({selected,onChange}) => {

      function handlePerkschange(ev) {
        const { checked, name } = ev.target;
        if (checked) {
          onChange([...selected, name])
        } else {
         onChange(selected.filter((item) => item !== name));
        }
      }

  return (
    <div>
                   <h1 className="text-2xl ">Perks</h1>
           <div className="flex items-center justify-between gap-2">
            <div className=" border-black border-2 flex gap-2 rounded-md p-2" >
            <input type="checkbox"checked={selected?.includes('wifi')} name="wifi" onChange={handlePerkschange}/><p>Wifi</p>
            </div>

            <div className=" border-black border-2 flex gap-2 rounded-md p-2" >
            <input type="checkbox"checked={selected?.includes('parking')} name="parking" onChange={handlePerkschange}/><p>Parking</p>
            </div>

            <div className=" border-black border-2 flex gap-2 rounded-md p-2" >
            <input type="checkbox"checked={selected?.includes('tv')} name="tv" onChange={handlePerkschange}/><p>Tv</p>
            </div>

            <div className=" border-black border-2 flex gap-2 rounded-md p-2" >
            <input type="checkbox"checked={selected?.includes('playArea')} name="playArea" onChange={handlePerkschange}/><p>PlayArea</p>
            </div>

            <div className=" border-black border-2 flex gap-2 rounded-md p-2" >
            <input type="checkbox"checked={selected?.includes('pets')} name="pets" onChange={handlePerkschange}/><p>Pets</p>
            </div>

           </div>

           {/* <textarea 
                className="border-2 p-1 rounded-sm w-1/2" 
                 placeholder="Enter Perks here" 
                value={perks} // Convert array to string
                onChange={ev => setperks(ev.target.value)} // Convert back to array
                 ></textarea> */}

    </div>
  )
}

export default Perks
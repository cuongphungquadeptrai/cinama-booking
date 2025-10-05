import Event1 from './img/event__1.jpg'
import Event2 from './img/event__2.png'
import Event3 from './img/event__3.png'



function Promos() {
    return (
        <div className="flex items-center justify-center gap-10 pb-10">
            <div><img src={Event1} alt="" className='h-[330px] transition-transform duration-300 hover:scale-105 cursor-pointer'/></div>
            <div><img src={Event2} alt="" className='h-[330px] transition-transform duration-300 hover:scale-105 cursor-pointer'/></div>
            <div><img src={Event3} alt="" className='h-[330px] transition-transform duration-300 hover:scale-105 cursor-pointer'/></div>
        </div>
    )
}

export default Promos;
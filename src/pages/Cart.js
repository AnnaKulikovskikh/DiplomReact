import { useContext, useRef } from "react"
import { Context } from '../Context'

export default function Cart() {
    // отображение заказанных товаров
    const { cart, outCart, emptyCart } = useContext(Context)
    let total = 0
    if (cart.length > 0) total = cart.reduce((sum, shoe) => sum + shoe.price * shoe.count, 0)
    const cartGoods = cart.map((item, index) => {
        return (
            <tr key={item.id}> 
                <td className="table">{index + 1}</td>
                <td className="table">{item.title}</td>
                <td className="table">{item.size}</td>
                <td className="table">{item.count}</td>
                <td className="table">{item.price}</td>
                <td className="table">{item.count*item.price}</td>
                <td className="table"><button className="btn-link" onClick={() => outCart(item.id)}>Удалить</button></td>
            </tr>
        )
    })

    //оформление заказа
    const tel = useRef(null)
    const address = useRef(null)

    function order() {
        if (!tel.current.value || !address.current.value) return null
        const orderInfo = {
            "owner": {
                "phone": tel.current.value,
                "address": address.current.value
            },
            "items": cart
        }

        const options = {
            method: "POST",
            body: JSON.stringify(orderInfo),
            headers: {"Content-Type": "application/json"}
        }
        emptyCart()

         fetch('http://localhost:7070/api/order', options)
         tel.current.value = ""
         address.current.value = ""
    }

    return (
        <div className="cart">
            <h2>Корзина</h2>
            <table className="goods-list">
              <thead>
              <tr>
                <th className="table head">#</th>
                <th className="table head">Название</th>
                <th className="table head">Размер</th>
                <th className="table head">Количество</th>
                <th className="table head">Стоимость</th>
                <th className="table head">Итого</th>
                <th className="table head">Действие</th>
              </tr>
              </thead>
              <tbody>
                {cartGoods}
              <tr>
                <td className="table total" colSpan={5}>Общая стоимость</td>
                <td className="table total-price">{total}</td>
              </tr>
              </tbody>
            </table>

            <h2>Оформить заказ</h2>
            <form className="order-form" onSubmit={order}>
                <label htmlFor="tel">Телефон</label>
                <input placeholder="Ваш телефон" id="tel" type="tel" ref={tel} />
                <label htmlFor="adress">Адерс доставки</label>
                <input placeholder="Адрес доставки" id="adress" type="text" ref={address} />
                <label><input type="checkbox" />Согласен с правилами доставки</label>
                <button type="submit" className="btn-link">Оформить</button>
            </form>
        </div>
    )
}





{/* <h2>Корзина</h2>
<div className="goods-list">
    <div className="table head">#</div>
    <div className="table head">Название</div>
    <div className="table head">Размер</div>
    <div className="table head">Количество</div>
    <div className="table head">Стоимость</div>
    <div className="table head">Итого</div>
    <div className="table head">Действие</div>
    <div className="table">1</div>
    <div className="table"></div>
    <div className="table"></div>
    <div className="table"></div>
    <div className="table"></div>
    <div className="table"></div>
    <div className="table"><button className="btn-link">Удалить</button></div>
    <div className="total">Общая стоимость</div>
    <div className="total-price"></div>
</div> */}
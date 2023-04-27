﻿using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class OrderController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/order")]
        public ResponseBase<List<Order>> GetList()
        {
            try
            {
                return new ResponseBase<List<Order>>
                {
                    data = db.Orders.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Order>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/order")]
        public ResponseBase<Order> Save(Order req)
        {
            try
            {
                req.created_at = DateTime.Now;
                db.Orders.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<Order>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Order>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/order/cancle/{id}")]
        public ResponseBase<bool> Cancle(int id = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = 2;
                ord.deleted_at = DateTime.Now;
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/order/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                db.Orders.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }
    }
}
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class ProductDTO: Product
    {
        public string category_name { get; set; }
        public string brand_name { get; set; }
    }
}
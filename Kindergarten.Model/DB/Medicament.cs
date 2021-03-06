﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    /// <summary>
    /// Модель единицы препоратов
    /// </summary>
    public class Medicament : IEquatable<Medicament>
    {
        /// <summary>
        /// Идентификатор
        /// </summary>
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MedicamentId { get; set; }

        /// <summary>
        /// Наименование
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// Количество
        /// </summary>
        [Required]
        public int Count { get; set; }
        /// <summary>
        /// Дата просрочки
        /// </summary>
        [Required]
        public DateTime ExpirationDate { get; set; }
        /// <summary>
        /// Примечание
        /// </summary>
        public string Comment { get; set; }

        public bool Equals(Medicament item) => this.MedicamentId == item.MedicamentId ? true : false;
    }
}

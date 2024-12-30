package entities

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name         string `gorm:"not null" json:"name"`
	Username     string `gorm:"not null; unique" json:"username"`
	Mobilenumber string `gorm:"not null; unique" json:"mobile_number"`
	Password     string `gorm:"not null" json:"password"`
	PubKey       string `gorm:"not null" json:"pubKey"`
}

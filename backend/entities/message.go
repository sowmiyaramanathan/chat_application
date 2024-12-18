package entities

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	FromUserID uint64 `gorm:"not null" json:"fromUserID"`
	FromUser   User   `gorm:"foreignkey:FromUserID"`
	ToUserID   uint64 `gorm:"not null" json:"toUserID"`
	ToUser     User   `gorm:"foreignkey:ToUserID"`
	Message    string `gorm:"not null" json:"message"`
}

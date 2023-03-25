package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Blog struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	Title     string `json:"title"`
	Author    string `json:"author"`
	Content   string `json:"content"`
	CreatedAt int64  `json:"created_at"`
}

func (b *Blog) ToMap() map[string]interface{} {
	return map[string]interface{}{
		"id":         b.ID,
		"title":      b.Title,
		"content":    b.Content,
		"created_at": b.CreatedAt,
	}
}

func main() {
	r := gin.Default()

	db, err := gorm.Open("sqlite3", "blog.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&Blog{})

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	r.Use(cors.New(config))

	r.GET("/blogs", func(c *gin.Context) {
		var blogs []Blog
		db.Order("created_at desc").Find(&blogs)
		var blogMaps []map[string]interface{}
		for _, blog := range blogs {
			blogMaps = append(blogMaps, blog.ToMap())
		}
		c.JSON(200, blogMaps)
	})

	r.GET("/blogs/:id", func(c *gin.Context) {
		var blog Blog
		db.First(&blog, c.Param("id"))
		if blog.ID == 0 {
			c.JSON(404, gin.H{"error": "blog not found"})
			return
		}
		c.JSON(200, blog.ToMap())
	})

	r.POST("/blogs", func(c *gin.Context) {
		var blog Blog
		if err := c.ShouldBindJSON(&blog); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		db.Create(&blog)
		c.JSON(201, blog.ToMap())
	})

	r.PUT("/blogs/:id", func(c *gin.Context) {
		var blog Blog
		db.First(&blog, c.Param("id"))
		if blog.ID == 0 {
			c.JSON(404, gin.H{"error": "blog not found"})
			return
		}
		if err := c.ShouldBindJSON(&blog); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		db.Save(&blog)
		c.JSON(200, blog.ToMap())
	})

	r.DELETE("/blogs/:id", func(c *gin.Context) {
		var blog Blog
		db.First(&blog, c.Param("id"))
		if blog.ID == 0 {
			c.JSON(404, gin.H{"error": "blog not found"})
			return
		}
		db.Delete(&blog)
		c.JSON(204, "delete success")
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}

export default {
    "swagger": "2.0",
    "info": {
        "description": "KELVIN Api Documentation.",
        "version": "1.0.0",
        "title": "KELVIN",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "apiteam@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "host": "localhost:5000",
    "basePath": "/api",
    "schemes": [
        "http"
    ],
    "tags": [
        {
            "name": "users"
        }
    ],
    "paths": {
        "/users": {
            "post": {
                "tags": [
                    "users"
                ],
                "summary": "Signup user",
                "description": "",
                "operationId": "registerUser",
                "consumes": "application/json",
                "produces": "application/json",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User object that needs to be added to the collection",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/UserRegister",
                        }
                    }
                ],
                "responses": {
                    "400": {
                        "description": "User already exists"
                    }
                }
            },
        },
        "/users/login": {
            "post": {
                "tags": [
                    "users"
                ],
                "summary": "Login user",
                "description": "",
                "operationId": "authUser",
                "consumes": "application/json",
                "produces": "application/json",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Log in information to identify the user",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/UserLogin",
                        }
                    }
                ],
                "responses": {
                    "401": {
                        "description": "Invalid email or password"
                    }
                }
            },
        },
        "/users/profile": {
            "get": {
                "tags": [
                    "users"
                ],
                "summary": "Search for user profile",
                "description": "Bearer authorization token of loggen in user must be provided",
                "operationId": "getUserProfile",
                "produces": "application/json",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "$ref": "#/definitions/UserProfile"
                        }
                    },
                    "401": {
                        "description": "User not found"
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "users"
                ],
                "summary": "Update user profile",
                "description": "Bearer authorization token of loggen in user must be provided",
                "operationId": "updateUserProfile",
                "consumes": "application/json",
                "produces": "application/json",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User profile update information",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/UserUpdateProfile",
                        }
                    }
                ],
                "responses": {
                    "401": {
                        "description": "User not found"
                    }
                },
                "security": [
                    {
                        "Bearer": []
                    }
                ]
            },
        }
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization"
        },
    },
    "definitions": {
        "UserRegister": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                },
                "email": {
                    "type": "string",
                },
                "password": {
                    "type": "string",
                },
            },
        },
        "UserLogin": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                },
                "password": {
                    "type": "string",
                },
            },
        },
        "UserProfile": {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "string"
                },
                "name": {
                    "type": "string",
                },
                "email": {
                    "type": "string",
                },
                "isAdmin": {
                    "type": "boolean",
                },
            },
        },
        "UserUpdateProfile": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string",
                },
                "email": {
                    "type": "string",
                },
                "password": {
                    "type": "string",
                },
            },
        },
    },
    "externalDocs": {
        "description": "Find out more about Swagger",
        "url": "http://swagger.io"
    }
}
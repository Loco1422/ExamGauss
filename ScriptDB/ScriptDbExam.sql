CREATE DATABASE [Exam]

GO
USE [Exam]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 22/9/2020 16:56:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Brand] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 22/9/2020 16:56:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[IdBrand] [int] NULL,
	[Cost] [decimal](13, 5) NOT NULL,
	[Price] [decimal](13, 5) NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 

INSERT [dbo].[Brand] ([Id], [Name]) VALUES (1, N'Adidas')
INSERT [dbo].[Brand] ([Id], [Name]) VALUES (2, N'Nike')
INSERT [dbo].[Brand] ([Id], [Name]) VALUES (3, N'Topper')
INSERT [dbo].[Brand] ([Id], [Name]) VALUES (4, N'Fila')
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Id], [Name], [IdBrand], [Cost], [Price]) VALUES (13, N'Test', 1, CAST(23.00000 AS Decimal(13, 5)), CAST(223.00000 AS Decimal(13, 5)))
INSERT [dbo].[Product] ([Id], [Name], [IdBrand], [Cost], [Price]) VALUES (24, N'fdfdsgsd', 2, CAST(23.00000 AS Decimal(13, 5)), CAST(55.00000 AS Decimal(13, 5)))
INSERT [dbo].[Product] ([Id], [Name], [IdBrand], [Cost], [Price]) VALUES (25, N'dsadas', 1, CAST(23.00000 AS Decimal(13, 5)), CAST(4242.00000 AS Decimal(13, 5)))
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Brand] FOREIGN KEY([IdBrand])
REFERENCES [dbo].[Brand] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Brand]
GO

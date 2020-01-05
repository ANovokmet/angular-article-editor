export interface ArticleComponentConfig {
	key: string;
	data: any;
}

export interface ParagraphConfig {
	key: string;
	data: string;
}

export interface TableConfig {
	key: string;
	data: Array<ArticleComponentConfig>;
}

export interface ColumnConfig {
	key: string;
	data: Array<ArticleComponentConfig>;
}

export interface ImageConfig {
	key: string;
	src: string;
	alt: string;
}

export type ArticleConfig = Array<ArticleComponentConfig>;

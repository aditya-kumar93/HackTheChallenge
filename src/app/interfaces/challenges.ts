export interface IChallenges {
    id: number;
    name: string;
    likesCount: number;
    description: string;
    tags: Tag[];
    isLiked: boolean;
    createdOn: Date;
    createdBy: string;
  }
  
  type Tag = 'FEATURE' | 'TECH' | 'ANGULAR' | 'SCRIPBOX';
  
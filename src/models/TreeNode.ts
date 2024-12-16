interface TreeNode {
    id: number;
    title: string;
    icon?: string,
    children?: TreeNode[] | null;
    link: string; // Proprietà opzionale per la navigazione
  }
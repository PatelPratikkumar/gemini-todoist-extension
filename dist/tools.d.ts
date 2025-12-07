/**
 * Tool Definitions for Todoist MCP Server
 * Defines all 22 tools for complete Todoist integration
 */
export declare const TODOIST_TOOLS: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            content: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            project_id: {
                type: string;
                description: string;
            };
            section_id: {
                type: string;
                description: string;
            };
            parent_id: {
                type: string;
                description: string;
            };
            labels: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            priority: {
                type: string;
                enum: number[];
                description: string;
            };
            due_string: {
                type: string;
                description: string;
            };
            due_date: {
                type: string;
                description: string;
            };
            assignee_id: {
                type: string;
                description: string;
            };
            duration: {
                type: string;
                description: string;
            };
            duration_unit: {
                type: string;
                enum: string[];
                description: string;
            };
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            project_id: {
                type: string;
                description: string;
            };
            section_id: {
                type: string;
                description: string;
            };
            label: {
                type: string;
                description: string;
            };
            filter: {
                type: string;
                description: string;
            };
            ids: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            content?: undefined;
            description?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            task_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            task_id: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
            labels: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            priority: {
                type: string;
                enum: number[];
                description: string;
            };
            due_string: {
                type: string;
                description: string;
            };
            due_date: {
                type: string;
                description: string;
            };
            assignee_id: {
                type: string;
                description: string;
            };
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            task_id: {
                type: string;
                description: string;
            };
            project_id: {
                type: string;
                description: string;
            };
            section_id: {
                type: string;
                description: string;
            };
            parent_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            project_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            parent_id: {
                type: string;
                description: string;
            };
            color: {
                type: string;
                enum: string[];
                description: string;
            };
            is_favorite: {
                type: string;
                description: string;
            };
            view_style: {
                type: string;
                enum: string[];
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            project_id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            color: {
                type: string;
                description: string;
                enum?: undefined;
            };
            is_favorite: {
                type: string;
                description: string;
            };
            view_style: {
                type: string;
                enum: string[];
                description: string;
            };
            content?: undefined;
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            project_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            section_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            project_id: {
                type: string;
                description: string;
            };
            order: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            section_id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            label_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            color: {
                type: string;
                description: string;
                enum?: undefined;
            };
            order: {
                type: string;
                description: string;
            };
            is_favorite: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            view_style?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            label_id: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            color: {
                type: string;
                description: string;
                enum?: undefined;
            };
            order: {
                type: string;
                description: string;
            };
            is_favorite: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            view_style?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            task_id: {
                type: string;
                description: string;
            };
            project_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            comment_id: {
                type: string;
                description: string;
            };
            content?: undefined;
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            content: {
                type: string;
                description: string;
            };
            task_id: {
                type: string;
                description: string;
            };
            project_id: {
                type: string;
                description: string;
            };
            description?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
            comment_id?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            comment_id: {
                type: string;
                description: string;
            };
            content: {
                type: string;
                description: string;
            };
            description?: undefined;
            project_id?: undefined;
            section_id?: undefined;
            parent_id?: undefined;
            labels?: undefined;
            priority?: undefined;
            due_string?: undefined;
            due_date?: undefined;
            assignee_id?: undefined;
            duration?: undefined;
            duration_unit?: undefined;
            label?: undefined;
            filter?: undefined;
            ids?: undefined;
            task_id?: undefined;
            name?: undefined;
            color?: undefined;
            is_favorite?: undefined;
            view_style?: undefined;
            order?: undefined;
            label_id?: undefined;
        };
        required: string[];
    };
})[];
//# sourceMappingURL=tools.d.ts.map
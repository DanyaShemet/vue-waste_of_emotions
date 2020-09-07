<template>
    <div class="categories">
        <h4>Все категории</h4>
        <div class="categoty-item" v-for="category in categories" :key="category.id">
            {{category.title}}
            <i class="material-icons">{{category.icon}}</i>
        </div>
        <CreateCategory @created="addNewCategory"/>
        <EditCategory />
    </div>
</template>

<script>
    import CreateCategory from '@/components/categories/CreateCategory'
    import EditCategory from '@/components/categories/EditCategory'
    export default {
        data: () => ({
           categories: []
        }),
        async mounted() {
          this.categories = await this.$store.dispatch('fetchCategories')
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            }
        },
        // computed: {
        //     categories(){
        //         return this.$store.dispatch('fetchCategories')
        //     }
        // },
        name: 'categories',
        components:{
            CreateCategory, EditCategory
        }
    }
</script>


import db from '../../models/index.js';
const { Progress, Favorite, Goal } = db;

const resolvers = {
    Mutation: {
        createProgressMutation: async (parent, { input }, context ) => {
            if(!context.user_id){
                throw new Error("Trebuie sa fii logat pentru a adauga progres.");
            }
            return await Progress.create({
                ...input,
                userId: context.user_id
            });
        },
        updateProgressMutation: async (parent,{id,input} , context) => {
            const progress = await Progress.findByPk(id);

            if(!progress) {
                throw new Error("Progresul nu a fost gasit!");
            }
            if(progress.userId !== context.user_id){
                throw new Error ("Nu poti modifica progresul altui user");
            }
            return await progress.update(input);
        },
        createGoalMutation: async(parent,{input},context) => {
            if(!context.user_id){
                throw new Error("Trebuie sa te loghezi pentru a adauga goal-uri");
            }
            return await Goal.create({
                ...input,
                userId:context.user_id
            });
        },

        updateGoalMutation: async(parent, {input,id}, context) =>{
            const goal = await Goal.findByPk(id);
            if(!goal){
                throw new Error ("Goal-ul nu a fost gasit");
            }
            if(context.user_id !== goal.userId){
                throw new Error ("Nu poti adauga un goal altui user");
            }
            return await goal.update(input);
        },

        completeGoalMutation:async(parent,{id} , context) =>{
            const goal = await Goal.findByPk(id);
            if(!goal){
                throw new Error ("Goal-ul nu exista");
            }
            if(context.user_id !== goal.userId){
                throw new Error ("Nu poti adauga un goal altui user");
            }
            return await goal.update({completed:true});
        },
        
        deleteGoalMutation: async(parent, {id} , context) =>{
            const goal = await Goal.findByPk(id);
            if(!goal){
                throw new Error ("Nu poti sterge un goal care nu exista");
            }
            if(context.user_id !== goal.userId){
                throw new Error ("Nu poti adauga un goal altui user");
            }
            await goal.destroy(id);

            return goal;
        },


        addFavoriteMutation: async(parent,{input},context) => {
            if(!context.user_id){
                throw new Error ("Trebuie sa fii logat pentru a adauga la favorite!");
            }
            const [favorite,created] = await Favorite.findOrCreate({
                where:{
                    userId : context.user_id , 
                    exerciseId : input.exerciseId 
                }
            })
            if(!created){
                throw new Error("Acest exercitiu este deja la favorite!");
            }

            return favorite;
        },
        
        removeFavoriteMutation: async(parent, {input}, context) => {
            if(!context.user_id){
                throw new Error("Trebuie sa te loghezi pentru a sterge de la favorite");
            }
            const favorite = await Favorite.findOne({
                where:{
                    userId: context.user_id,
                    exerciseId : input.exerciseId
                }
            })

            if(!favorite){
                throw new Error("Acest exercitiu nu se afla la favorite / Nu ai acest exercitiu la favorite");
            }
            await favorite.destroy();
            return favorite;
        }
    }
};

export default resolvers;
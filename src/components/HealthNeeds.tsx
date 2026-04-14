import React from 'react';
import Link from 'next/link';

const HealthNeeds: React.FC = () => {
    return (
        <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-on-surface">Common Health Needs</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:gap-6">
                {[
                    { name: 'Malaria', icon: 'bug_report', slug: 'malaria' },
                    { name: 'Fever', icon: 'thermostat', slug: 'fever' },
                    { name: 'Pain Relief', icon: 'personal_injury', slug: 'pain-relief' },
                    { name: 'Cough', icon: 'air', slug: 'cough' },
                    { name: 'Infection', icon: 'vaccines', slug: 'infection' },
                    { name: 'Stomach', icon: 'gastroenterology', slug: 'stomach' }
                ].map((item) => (
                    <Link key={item.slug} href={`/needs/${item.slug}`} className="min-w-[100px] flex flex-col items-center gap-2 active:scale-95 transition-all">
                        <div className="w-20 h-20 bg-secondary-container flex items-center justify-center rounded-3xl overflow-hidden">
                            {item.slug === 'malaria' ? (
                                <img src="https://d.medicaldaily.com/en/full/290654/mosquito.jpg?w=736&f=916646ba21964a702bbb74eee14099df" alt="Malaria" className="w-full h-full object-cover" />
                            ) : item.slug === 'fever' ? (
                                <img src="https://img.freepik.com/premium-photo/parent-child-forehead-check-with-thermometer-fever-bedroom-wellness-assessment-covid-flu-black-person-kid-sick-home-with-care-allergy-inspection-with-tools-virus_590464-424450.jpg" alt="Fever" className="w-full h-full object-cover" />
                            ) : item.slug === 'pain-relief' ? (
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCixucxLJtE4ZxEG0TmeJArqaQZhGYEpZvvQ&s" alt="Pain Relief" className="w-full h-full object-cover" />
                            ) : item.slug === 'cough' ? (
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk57LDQuACunQq-De2vrodMCYlyLaVQV9pg&s" alt="Cough" className="w-full h-full object-cover" />
                            ) : item.slug === 'infection' ? (
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0tV97gWcIQ_2ml3vWRdo1DLKWC0sg7Ws9Q&s" alt="Infection" className="w-full h-full object-cover" />
                            ) : item.slug === 'stomach' ? (
                                <img src="https://media.istockphoto.com/id/2164034292/photo/man-holding-stomach-in-discomfort-experiencing-abdominal-pain.jpg?s=612x612&w=0&k=20&c=yPBOLPVgziW5IwofzMz21PgwoE1bRlmg421YzWsBmoQ=" alt="Stomach" className="w-full h-full object-cover" />
                            ) : (
                                <span className="material-symbols-outlined text-primary text-3xl" data-icon={item.icon}>{item.icon}</span>
                            )}
                        </div>
                        <span className="text-sm font-semibold text-on-surface">{item.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HealthNeeds;
